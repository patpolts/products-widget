import { ProductPagination } from "@application/entities/products/pagination";


export class ProductPaginationViewModel{
    static toHttp(pagination: ProductPagination){
        return{
            page: pagination.page,
            limit: pagination.limit,
            total: pagination.total,
            lastPage: pagination.lastPage,
        
        }
    }
}