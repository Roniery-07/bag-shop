import { brl, UIItem } from './page'
interface CartBuyBoxProps {
  items: UIItem[] | null
  subtotal: number
  discount: number
  couponCode: string
  shippingCost: number
  setShippingCost: (x: number) => void
  setDiscount: (x: number) => void
  setCoupon: (x: string) => void
}

export const CartBuyBox = ({
  items,
  subtotal,
  discount,
  couponCode,
  shippingCost,
  setCouponCode,
  setDiscount,
  setShippingCost,
}: CartBuyBoxProps) => {
  return (
    <aside className="sticky top-6 h-fit space-y-4">
      <div className="border border-neutral-200/70 rounded-2xl shadow-sm p-5">
        <h2 className="text-lg font-semibold">Resumo do pedido</h2>

        {/* Divisor */}
        <div className="my-4 h-px bg-neutral-200" />

        {/* Lista de custos */}
        <dl className="space-y-3 text-sm">
          <div className="flex items-center justify-between">
            <dt className="text-neutral-600">
              Subtotal ({items?.length} {items?.length === 1 ? 'item' : 'itens'}
              )
            </dt>
            <dd className="font-medium">{brl(subtotal)}</dd>
          </div>

          {/* Exibe o frete apenas se já foi calculado */}
          {shippingCost > 0 && (
            <div className="flex items-center justify-between">
              <dt className="text-neutral-600">Frete</dt>
              <dd className="font-medium">{brl(shippingCost)}</dd>
            </div>
          )}

          {/* Exibe os descontos apenas se um cupom válido foi aplicado */}
          {discount > 0 && (
            <div className="flex items-center justify-between text-green-600">
              <dt>Desconto (Cupom)</dt>
              <dd className="font-medium">- {brl(discount)}</dd>
            </div>
          )}

          {/* Divisor */}
          <div className="!my-4 h-px bg-neutral-200" />

          <div className="flex items-center justify-between text-base font-semibold">
            <dt>Total</dt>
            <dd>{brl(subtotal)}</dd>
          </div>
        </dl>
      </div>

      {/* Seção de Cupom de Desconto */}
      <div className="border border-neutral-200/70 rounded-2xl shadow-sm p-5">
        <label htmlFor="coupon" className="font-medium text-sm block mb-2">
          Cupom de desconto
        </label>
        <div className="flex gap-2">
          <input
            id="coupon"
            type="text"
            placeholder="Insira seu cupom"
            value={couponCode}
            onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
            className="px-3 w-full rounded-lg border-neutral-300 focus:ring-blue-500 focus:border-blue-500 text-sm"
          />
          <button
            onClick={() => {
              /* Lógica para validar o cupom */
            }}
            className="px-4 py-2 bg-neutral-200 text-neutral-800 rounded-lg hover:bg-neutral-300 text-sm font-semibold"
          >
            Aplicar
          </button>
        </div>
      </div>

      {/* Seção de Frete (Exemplo simples) */}
      <div className="border border-neutral-200/70 rounded-2xl shadow-sm p-5">
        <label htmlFor="cep" className="font-medium text-sm block mb-2">
          Calcular frete
        </label>
        <div className="flex gap-2">
          <input
            id="cep"
            type="text"
            placeholder="Seu CEP"
            className="px-3 w-full rounded-lg border-neutral-300 focus:ring-blue-500 focus:border-blue-500 text-sm"
          />
          <button
            onClick={() => {
              /* Lógica para buscar frete na API dos correios ou transportadora */
            }}
            className="px-4 py-2 bg-neutral-200 text-neutral-800 rounded-lg hover:bg-neutral-300 text-sm font-semibold"
          >
            OK
          </button>
        </div>
      </div>
    </aside>
  )
}
