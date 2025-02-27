export const formattedNumber = (number: number, options?: Intl.NumberFormatOptions) => {
    return new Intl.NumberFormat("en-NG", {
        style: "currency",
        currency: "NGN",
        ...options
    }).format(number);
}