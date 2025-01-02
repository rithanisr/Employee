// // src/types/express/index.d.ts
// import { JwtPayload } from 'jsonwebtoken';

// declare global {
//   namespace Express {
//     interface Request {
//       user?: JwtPayload; // This defines the user property in the request object
//     }
//   }
// }
// import * as express from "express"
// declare global {
//     namespace Express {
//         interface Request {
//             user? : Record<string,any>
//         }
//     }
// }

// import { JwtPayload } from 'jsonwebtoken';

//     interface Request {
// declare global {
//   namespace Express {
//       user?: {
//         userId: string;
//         email: string;
//       } | JwtPayload;
//     }
//   }
// }
import { Express } from 'express-serve-static-core';

declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
        email: string;
        name: string;
      };
    }
  }
}
