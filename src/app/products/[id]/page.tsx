import React from 'react'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'
import { DropdownList } from '@/components/DropdownList'

import { ShoppingCartIcon } from 'lucide-react'
export default function ProductPage (){
    return (
        <div>
            <div className='w-full h-full  flex flex-row '>
                <div className=' flex-1/2 p-4 h-[500px]'> {/*image container*/}
                    <div className='h-full w-full p-4 bg-white'>image</div>
                </div>
                <div className=' flex-1/2 p-4 flex flex-row'> {/* product description */}
                    <div className='flex-4/6 px-3'>
                        <div> {/*headers*/}
                            <p className='text-xl'>Mala Pequena de Bordo 10kg Rígida Rodas Giro 360° Verona Stradda</p>
                            <p>R$ 20,99</p> {/*description*/}
                        </div>
                    </div>
                    <div className='flex-2/6 border-2 p-4 border-slate-300 rounded-md '> {/*buy section*/}
                        <div className='flex flex-col '>
                            <p>R$ 20,99</p>
                            <p className='text-sm font-bold'>Entrega A Combinar</p>
                        </div>
                        <div className='flex flex-col gap-5 mb-3'>
                            <DropdownList className="bg-white hover:bg-slate-100 transition-all"/>
                            <Button className='bg-yellow-400 w-full hover:bg-yellow-500 transition-all align-center'>
                                Adicionar ao Carrinho
                                <ShoppingCartIcon/>
                            </Button>     
                            <Button className='bg-green-500 w-full hover:bg-green-600 transition-all '>Comprar</Button>     
                        </div>
                        <hr className='text-slate-300 pb-4'/>
                        <div className='flex flex-row'>
                            <Label htmlFor='isPresentInput'>Comprar esse item como presente</Label>
                            <Checkbox id='isPresentInput'/>
                        </div>
                    </div>
                </div>
            </div>

            <div className='w-full bg-amber-300'> {/*itens relacionados*/}
                ola
            </div>
        </div>
    )
}
