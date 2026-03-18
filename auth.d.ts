import * as express from 'express'; 

interface RequestUser {
  id: string;
  role: string;
  name: string;
}

type AuthenticatedRequest = express.Request & { user?: RequestUser };