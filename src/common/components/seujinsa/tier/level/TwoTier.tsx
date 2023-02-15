import React from 'react'

export default function TwoTier({ gamerList }: any  ) {
  return (
    <div className="container">
      {gamerList.map((e: string) => {
        return (
          <div>
            <img src={`/images/gamer/${e}.png`} alt="" />
            {e}
          </div>
        );
      })}
    </div>
  )
}
