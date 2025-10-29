import React, { useState } from 'react'
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"

export const DropdownArrow = () => (
  <div className='cursor-pointer'>
    <svg  xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-chevron-down-icon lucide-chevron-down"><path d="m6 9 6 6 6-6"/></svg>
  </div>
);

const cardTagList = [
  "HTML", "CSS", "JS", "React", "Vue", "Angular", "Node.js", 
  "Express", "MongoDB", "SQL", "Python", "Django", "Firebase", 
  "Tailwind", "Bootstrap", "API", "CMS", "PHP", "Laravel", "WordPress", 
  "TypeScript", "Docker", "Guide", "AWS", "Azure", "Library", 
  "Framework", "Design", "Tutorial", "UI/UX", "Performance", 
  "Security", "SEO", "Portfolio", "Template", "Theme", "Media", 
  "Testing", "DevOps", "Cloud", "Game Dev", "Git", "PDF", "JSON", 
  "AI", "Hosting", "Google", "FEM", "Image Library", "Icon Library", 
  "UTM", "Bitly", "CSV", "BE", "FE", "Fullstack", "Images", "GIF"
]

const sortedList = cardTagList.sort();

export const CardTags = ({onChange, selectedTags}) => {

  const toggleTag = (tag) => {
    if (selectedTags.includes(tag)) {
      onChange(selectedTags.filter((t) => t !== tag));
    } else {
      onChange([...selectedTags, tag]);
    }
  };

  return (
    <>
      <Collapsible>
        <CollapsibleTrigger>
          <Label className="col-span-full">Select Tag(s)<span><DropdownArrow /></span></Label>
        </CollapsibleTrigger>
        <CollapsibleContent className="cust_list_grid mt-3">
          {sortedList.map((tag, index) => {
            const isChecked = selectedTags.includes(tag)
            return (
              <div key={index}>
                <Label
                  htmlFor={tag}
                  className={`
                    p-2 rounded-sm cursor-pointer h-full transition duration-200 ease-in-out
                    ${isChecked ? "bg-green-800 text-white" : "bg-gray-500 text-black"}
                  `}>
                  <Checkbox
                    id={tag}
                    checked={isChecked}
                    onCheckedChange={() => toggleTag(tag)}
                    onChange={onChange}
                  />
                  {tag}
                </Label>
              </div>
            );
          })}
        </CollapsibleContent>
      </Collapsible>
    </>
  )
}

export default CardTags