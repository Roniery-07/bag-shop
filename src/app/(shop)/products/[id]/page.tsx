import React from 'react'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'
import { DropdownList } from '@/components/dropdown-list'
import { ShoppingCartIcon } from 'lucide-react'
import { ProductSection } from '@/components/product-section'

import { getProduct, listProducts } from '@/lib/modules/product/product.service'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import Link from 'next/link'

interface PageProps {
    params: { id: string }
}

export default async function ProductPage({ params }: PageProps) {
    const p = await params
    const id = Number(p.id)

    console.log("fetching: ")
    const products = await listProducts();
    console.log(products)

    const product = await getProduct(id)
    if (!product) notFound();

    return (
        <div className='max-w-6xl m-auto '>
            <div className='w-full h-full p-4 flex flex-row '>
                <div className='flex-1/2'> {/*image container*/}
                    <div className="relative max-h-[500px] max-w-[500px] aspect-square overflow-hidden rounded-lg m-auto">
                        <Image
                            src={product.images.find(image => image.order == 1)?.url ?? product.images[0].url}
                            alt={product.name ?? "image"}
                            fill
                            className="object-cover transition-transform duration-300 group-hover:scale-105"
                            priority
                        />
                    </div>
                </div>
                <div className=' flex-1/2 flex flex-row'> {/* product description */}
                    <div className='flex-4/6 px-3'>
                        <div className='flex flex-col'> {/*headers*/}
                            <div> {/*product especification*/ }
                                <p className='text-xl'>{product.name}</p>
                                <p className='text-xl'>{product.description}</p>
                                <p>R$ {product.price.toLocaleString('br')}</p> {/*description*/}
                                <div className='flex items-center w-full py-4'>
                                <hr className='text-slate-300  w-full'/>
                                </div>
                            </div>

                            <div className='flex flex-col'> {/*product variations*/}
                                <Link href={`/product`}>
                                    <div className='w-24 h-32  rounded-md flex justify-center items-center border-2 border-gray-400'>
                                        <div className='w-[80%] h-[80%] bg-red-300 relative rounded-md'>
                                            <Image
                                                src={product.images.find(image => image.order == 1)?.url ?? product.images[0].url}
                                                alt={product.name ?? "image"}
                                                fill
                                                className="object-cover transition-transform duration-300 group-hover:scale-105"
                                                priority
                                            />
                                        </div>
                                    </div>
                                </Link>
                            </div>
                            
                        </div>
                    </div>
                    <div className='flex-2/6 border-2 p-4 border-slate-300 rounded-md '> {/*buy section*/}
                        <div className='flex flex-col '>
                            <p>R$ {product.price.toLocaleString('br')}</p>
                            <p className='text-sm font-bold'>Entrega A Combinar</p>
                        </div>
                        <div className='flex flex-col gap-5 mb-3'>
                            <DropdownList className="bg-white hover:bg-slate-100 transition-all" />
                            <Button className='bg-yellow-400 w-full hover:bg-yellow-500 transition-all align-center'>
                                Adicionar ao Carrinho
                                <ShoppingCartIcon />
                            </Button>
                            <Button className='bg-green-500 w-full hover:bg-green-600 transition-all '>Comprar</Button>
                        </div>
                        <hr className='text-slate-300 pb-4' />
                        <div className='flex flex-row'>
                            <Label htmlFor='isPresentInput'>Comprar esse item como presente</Label>
                            <Checkbox id='isPresentInput' />
                        </div>
                    </div>
                </div>
            </div>

            <div className='w-full'> {/*itens relacionados*/}
                <ProductSection products={products} itemsPerPage={4} />
            </div>
        </div>
    )
}
