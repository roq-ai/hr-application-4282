import type { NextApiRequest, NextApiResponse } from 'next';
import { roqClient } from 'server/roq';
import { prisma } from 'server/db';
import { errorHandlerMiddleware } from 'server/middlewares';
import { leaveValidationSchema } from 'validationSchema/leaves';
import { HttpMethod, convertMethodToOperation, convertQueryToPrismaUtil } from 'server/utils';
import { getServerSession } from '@roq/nextjs';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { roqUserId, user } = await getServerSession(req);
  await prisma.leave
    .withAuthorization({
      roqUserId,
      tenantId: user.tenantId,
      roles: user.roles,
    })
    .hasAccess(req.query.id as string, convertMethodToOperation(req.method as HttpMethod));

  switch (req.method) {
    case 'GET':
      return getLeaveById();
    case 'PUT':
      return updateLeaveById();
    case 'DELETE':
      return deleteLeaveById();
    default:
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  async function getLeaveById() {
    const data = await prisma.leave.findFirst(convertQueryToPrismaUtil(req.query, 'leave'));
    return res.status(200).json(data);
  }

  async function updateLeaveById() {
    await leaveValidationSchema.validate(req.body);
    const data = await prisma.leave.update({
      where: { id: req.query.id as string },
      data: {
        ...req.body,
      },
    });

    return res.status(200).json(data);
  }
  async function deleteLeaveById() {
    const data = await prisma.leave.delete({
      where: { id: req.query.id as string },
    });
    return res.status(200).json(data);
  }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  return errorHandlerMiddleware(handler)(req, res);
}
