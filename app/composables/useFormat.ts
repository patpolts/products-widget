export function useFormat() {

    function formatPrice(value: number): string {
        return new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL',
        }).format(value / 100)
    }

    return {
        formatPrice,
    }
}