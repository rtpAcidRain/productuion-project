import { TestAsyncThunk } from '@/shared/lib/tests/testAsyncThunk/testAsyncThunk';
import { fetchArticleById } from './fetchArticleById';

const data = {
    id: '1',
    title: 'Javascript news',
    subtitle: 'Что нового в JS за 2022 год?',
    img: 'https://teknotower.com/wp-content/uploads/2020/11/js.png',
    views: 1022,
    createdAt: '26.02.2022',
    type: ['IT'],
    blocks: [
        {
            id: '1',
            type: 'TEXT',
            title: 'Заголовок этого блока',
            paragraphs: [
                '',
            ],
        },
        {
            id: '4',
            type: 'CODE',
            code: '',
        },
        {
            id: '5',
            type: 'TEXT',
            title: 'Заголовок этого блока',
            paragraphs: [
                '',
            ],
        },
        {
            id: '2',
            type: 'IMAGE',
            src: 'https://hsto.org/r/w1560/getpro/habr/post_images/d56/a02/ffc/d56a02ffc62949b42904ca00c63d8cc1.png',
            title: 'Рисунок 1 - скриншот сайта',
        },
        {
            id: '3',
            type: 'CODE',
            code: '',
        },
        {
            id: '7',
            type: 'TEXT',
            title: 'Заголовок этого блока',
            paragraphs: [
                '',
            ],
        },
        {
            id: '8',
            type: 'IMAGE',
            src: 'https://hsto.org/r/w1560/getpro/habr/post_images/d56/a02/ffc/d56a02ffc62949b42904ca00c63d8cc1.png',
            title: 'Рисунок 1 - скриншот сайта',
        },
        {
            id: '9',
            type: 'TEXT',
            title: 'Заголовок этого блока',
            paragraphs: [
                '',
            ],
        },
    ],
};

describe('fetchArticleById.test', () => {
    test('success ', async () => {
        const thunk = new TestAsyncThunk(fetchArticleById);
        thunk.api.get.mockReturnValue(
            Promise.resolve({
                data,
            }),
        );

        const result = await thunk.callThunk('1');

        expect(thunk.api.get).toHaveBeenCalled();
        expect(result.meta.requestStatus).toBe('fulfilled');
        expect(result.payload).toEqual(data);
    });

    test('error ', async () => {
        const thunk = new TestAsyncThunk(fetchArticleById);
        thunk.api.get.mockReturnValue(Promise.resolve({ status: 403 }));

        const result = await thunk.callThunk('1');

        expect(result.meta.requestStatus).toBe('rejected');
    });
});
