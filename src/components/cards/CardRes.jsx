import React, {memo, useState} from 'react'
import { Button } from "@/components/ui/button"
import CardEdit from "@/components/cards/CardEdit";
import ImgPlaceholder from "@/components/custom/ImgPlaceholder";
import { SquareMousePointer } from 'lucide-react';

const GoBtn = ({url}) => {
  return (
    <>
      <Button className="cust_cardRes_Btn" asChild>
          <a href={url} target='_blank' rel="noopener noreferrer">
              <span>Go</span>
              <SquareMousePointer />
          </a>
      </Button>
    </>
  )
}

export const CardRes = ({card, userRole, openEditModal}) => {
  return (
    <>
        <div className='flex flex-col gap-4 bg-black rounded-3xl p-4 text-white border-4 border-gray-500 overflow-hidden hover:scale-[1.02] transition-transform duration-200 ease-in-out z-0'>
            <div className='rounded-tr-xl rounded-tl-xl overflow-hidden w-full h-46 flex justify-center items-center'>
              {card.imageUrl ? (
                  <img  src={card.imageUrl}
                        alt={card.title}
                        width="180px"
                        height="auto"
                        loading='lazy'
                  />  
                ) : (
                  <ImgPlaceholder />
                )
              }
            </div>
            <h3 className='uppercase tracking-wider font-medium'>{card.title}</h3>
            <div className='flex-1'>
              {card.tags?.length > 0 && (
                  <ul className='list-none flex flex-wrap gap-2'>
                    {card.tags.map((tag, index) => (
                      <li key={index} className='p-2 bg-gray-600 rounded-[8px]'>{tag}</li>
                    ))}
                  </ul>
                )}
            </div>
            <div className='flex justify-between items-center mb-0'>
                <GoBtn url={card.url} />
                {userRole === "admin" && (
                    <CardEdit card={card} onClick={openEditModal} />
                  )
                }
            </div>
        </div>
    </>
  )
}

export default memo(CardRes);
