// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

interface IProps {
  data: {
    [key: string]: {
      visible: boolean;
      menuItems: {
        [key: string]: {
          route?: string;
        };
      };
    };
  };
}

const dummy: IProps = {
  data: {
    명품: {
      visible: true,
      menuItems: {
        핸드백: {
          route: "/rank/royal/bag",
        },
        시계: {
          route: "/rank/royal/watch",
        },
      },
    },
    인플루언서: {
      visible: true,
      menuItems: {
        아프리카: {
          route: "/rank/influencer/afreeca",
        },
      },
    },
    게임: {
      visible: true,
      menuItems: {
        스타크래프트: {
          route: "/seujinsa/tier/standard",
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
