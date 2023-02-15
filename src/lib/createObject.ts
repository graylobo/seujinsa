interface ITemplateProps {
  [key: string]: ITemplateItemProps;
}
interface ITemplateItemProps {
  level: number;
  brandName: string;
  link: string;
  logo: string;
  tierName?: string;
  scaleX?: number;
  scaleY?: number;
}
function createObject(data: any) {
  data = Object.entries(data);
  return data.reduce((acc: any, cur: any) => {
    const key = cur[0];
    const { level, tierName, link, logo, brandName, scaleX, scaleY } = cur[1];
    acc[level] = {
      ...acc[level],
      [key]: {
        brandName,
        link,
        logo,
        ...(tierName && { tierName }),
        ...(scaleX && { scaleX }),
        ...(scaleY && { scaleY }),
      },
    };
    return acc;
  }, {});
}

export { createObject };
export type { ITemplateProps, ITemplateItemProps };
