import { toast } from "sonner";
import { CheckCircle, XCircle } from "lucide-react";
import { Product } from "@/types/index";

export function useProductToast() {
  const showAddedToast = (product: Product) => {
    toast.custom(() => (
      <div className="bg-white rounded-xl p-4 shadow flex items-center space-x-3 border border-green-200">
        <CheckCircle className="text-green-500" />
        <div>
          <p className="font-semibold text-green-600">Добавлено в корзину</p>
          <p className="text-sm text-gray-600">{product.title}</p>
        </div>
      </div>
    ));
  };

  const showOutOfStockToast = (product: Product, amount: number) => {
    toast.custom(() => (
      <div className="bg-white rounded-xl p-4 shadow flex items-center space-x-3 border border-red-200">
        <XCircle className="text-red-500" />
        <div>
          <p className="font-semibold text-red-600">Осталось {amount} шт на складе</p>
          <p className="text-sm text-gray-600">{product.title} закончился</p>
        </div>
      </div>
    ));
  };

  return { showAddedToast, showOutOfStockToast };
}
