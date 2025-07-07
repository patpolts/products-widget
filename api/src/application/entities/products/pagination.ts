export interface ProductPaginationProps{
    page: number;
    total?: number;
    limit: number;
}
export class ProductPagination{
    private props: ProductPaginationProps;

    constructor(props: ProductPaginationProps){
        this.props = props;
    }

    public get page(): number{
        return this.props.page;
    }

    public set page(value:number){
        this.props.page = Math.max(1,value || 1);
    }
    
    public get limit() : number {
        return this.props.limit;
    }

    public set limit(value : number) {
        this.props.limit = Math.max(1,value || 10);
    }
    
    public get total() : number {
        return this.props.total ?? 0;
    }

    public set total(value : number) {
        this.props.total = value;
    }
    
    public get offset() : number {
        return (this.page -1) * this.limit;
    }

    public get lastPage() : number {
        return Math.ceil(this.total / this.limit)
    }

}