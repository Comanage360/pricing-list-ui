export type IntentName =
    | 'lowest_current' | 'lowest_on_date' | 'highest_current' | 'highest_on_date'
    | 'current_all_vendors' | 'on_date_all_vendors'
    | 'price_on_date' | 'price_current'
    | 'price_history' | 'avg_price_range'
    | 'vendors_for_product' | 'compare_lowest_products'
    | 'final_price_current' | 'final_price_on_date'
    | 'convert_currency'
    | 'products_with_multiple_prices_current' | 'products_with_multiple_prices_on_date'
    | 'unknown';

export interface ClassifiedIntent {
    intent: IntentName;
    product_text: string | null;
    compare_product_text?: string | null;
    as_of?: string | null;
    date_from?: string | null;
    date_to?: string | null;
    region_code?: string | null;
    program_code?: string | null;
    vendor_text?: string | null;
    quantity?: number | null;
    target_currency?: string | null;
}

export interface ApiResponse {
    intent: ClassifiedIntent;
    answer?: any;
    answers?: any[];
    average?: number | null;
    a?: any;
    b?: any;
    plan?: any;
    result?: any;
}
