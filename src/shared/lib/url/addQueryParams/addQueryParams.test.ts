import { getQueryParams } from './addQueryParams';

describe('shared/url/addQueryParams', () => {
    test('test with one param', () => {
        const params = getQueryParams({
            text: 'value',
        });
        expect(params).toBe('?text=value');
    });

    test('test with many param', () => {
        const params = getQueryParams({
            text: 'value',
            sext: 'sexlue',
        });
        expect(params).toBe('?text=value&sext=sexlue');
    });

    test('test with undefined', () => {
        const params = getQueryParams({
            text: 'value',
            sext: undefined,
        });
        expect(params).toBe('?text=value');
    });
});
