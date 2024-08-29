import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { getCategories, getProducts } from '../../services/FakeStoreAPI';

describe('FakeStoreAPI', () => {
    beforeEach(() => {
        vi.stubGlobal('fetch', vi.fn());
    })

    afterEach(() => {
        vi.clearAllMocks()
    })

    it('getCategories should return categories when fetch is successful', async () => {
        const mockCategories = ['cat1', 'cat2']
        fetch.mockResolvedValueOnce({
            ok: true,
            json: () => Promise.resolve(mockCategories),
        })

        const result = await getCategories();
        expect(fetch).toHaveBeenCalledWith('https://fakestoreapi.com/products/categories')
        expect(result).toEqual(mockCategories)
    })

    it('getCategories should return categories when fetch is successful', async () => {
        const mockProducts = ['prod1', 'prod2']
        fetch.mockResolvedValueOnce({
            ok: true,
            json: () => Promise.resolve(mockProducts),
        })

        const result = await getProducts('')
        expect(result).toEqual(mockProducts)
    })
})