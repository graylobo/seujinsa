// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

const dummy = {
  data: {
    명품: {
      visible: true,
      menuItems: {
        핸드백: {
          route: "/ranking/royal/bag",
        },
        시계: {
          route: "/ranking/royal/watch",
        },
      },
    },
    인플루언서: {
      visible: true,
      menuItems: {
        아프리카: {
          route: "/ranking/influencer/afreeca",
        },
      },
    },
    연예인: {
      visible: false,
      menuItems: {
        아이돌: {},
      },
    },
  },
};

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  res.status(200).json(dummy);
}
