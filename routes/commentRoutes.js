import express from 'express';
const { Router } = express;

import Comment from '../models/Comment.js';
import verifyToken from '../middleware/auth.js';

const router = Router();

// 댓글 작성
router.post('/', verifyToken, /** @param {import('../auth').AuthenticatedRequest} req */ async (req, res) => {
  if (!req.user) return res.status(401).json({ error: '인증이 필요합니다.' });

  const { boardId, content, nickname } = req.body;
  if (!boardId || !content || !nickname) {
    return res.status(400).json({ error: 'boardId, content, nickname은 필수입니다.' });
  }

  try {
    const comment = new Comment({
      boardId,
      content,
      nickname,
      authorId: req.user.id,
    });
    await comment.save();
    res.status(201).json({ message: '댓글이 등록되었습니다.', data: comment });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: '댓글 등록 오류' });
  }
});

// 특정 게시글의 댓글 목록 조회
router.get('/:boardId', verifyToken, async (req, res) => {
  try {
    const comments = await Comment.find({
      boardId: req.params.boardId,
      isDeleted: false
    }).sort({ createdAt: 1 });
    res.status(200).json(comments);
  } catch (error) {
    res.status(500).json({ error: '댓글 조회 오류' });
  }
});

// 댓글 수정 (작성자만)
router.patch('/:id', verifyToken, /** @param {import('../auth').AuthenticatedRequest} req */ async (req, res) => {
  if (!req.user) return res.status(401).json({ error: '인증이 필요합니다.' });

  try {
    const comment = await Comment.findById(req.params.id);
    if (!comment) return res.status(404).json({ error: '댓글을 찾을 수 없습니다.' });
    if (comment.authorId !== req.user.id) {
      return res.status(403).json({ error: '수정 권한이 없습니다.' });
    }

    const { content } = req.body;
    if (content) comment.content = content;
    await comment.save();
    res.json({ message: '댓글이 수정되었습니다.', data: comment });
  } catch (error) {
    res.status(500).json({ error: '댓글 수정 오류' });
  }
});

// 댓글 삭제 (soft delete — 작성자 또는 반장/부반장/선생님/관리자)
router.delete('/:id', verifyToken, /** @param {import('../auth').AuthenticatedRequest} req */ async (req, res) => {
  if (!req.user) return res.status(401).json({ error: '인증이 필요합니다.' });

  try {
    const comment = await Comment.findById(req.params.id);
    if (!comment) return res.status(404).json({ error: '댓글을 찾을 수 없습니다.' });

    const isAuthor = comment.authorId === req.user.id;
    const isPrivileged = ['관리자', '반장', '부반장', '선생님'].includes(req.user.role);

    if (!isAuthor && !isPrivileged) {
      return res.status(403).json({ error: '삭제 권한이 없습니다.' });
    }

    comment.isDeleted = true;
    await comment.save();
    res.json({ message: '댓글이 삭제되었습니다.' });
  } catch (error) {
    res.status(500).json({ error: '댓글 삭제 오류' });
  }
});

export default router;
