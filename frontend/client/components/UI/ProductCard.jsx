import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { formattedPrice } from "@actions/format";

const ProductCard = ({product,loading=false}) => {
  
  if(loading) return <div className="size-full h-[348px] max-h-[348px] shadow-lg p-2 rounded-lg bg-surface text-on-surface hover:shadow-on-background/50 hover:shadow-2xl cursor-pointers">
  </div>
  if(!product) return null
  return (
    <Link href={`/product/${product.product_id}`} className="flex flex-col w-full gap-2 shadow-lg p-2 rounded-lg bg-surface text-on-surface hover:shadow-on-background/50 hover:shadow-2xl cursor-pointer">
      <div className="text-lg font-semibold break-all ">{product.product_name}</div>
      <div className='relative w-full h-[200px] flex justify-center'>
        <Image
          src={product.images[0]?product.images[0]:process.env.NEXT_PUBLIC_APP_LOGO}
          alt="product image"
          width={300}
          height={300}
          quality={75}
          className="h-full object-contain w-full"
          priority
        />
      </div>
      <div className="text-lg">{formattedPrice(product.price-product.price/100*product.discount)}</div>
      <div className="text-sm opacity-50 font-semibold">
        {formattedPrice(product.price)} <span className="text-red-500">-{product.discount}%</span>{" "}
      </div>
      <div className="text-yellow-400 flex flex-row items-baseline gap-1">
        <span className="font-semibold">{product.average_rating}</span>
        <FontAwesomeIcon icon={faStar} />
      </div>
    </Link>
  );
};

export default ProductCard;
