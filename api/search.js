import axios from 'axios';

export default async (req, res) => {
    const { query } = req.query;
    try {
        const { data } = await axios.get(`https://openapi.naver.com/v1/search/news.json`, {
            params: { query: query, display: 10 },
            headers: {
                'X-Naver-Client-Id': process.env.NAVER_CLIENT_ID,
                'X-Naver-Client-Secret': process.env.NAVER_CLIENT_SECRET
            }
        });
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ message: 'API 호출 중 에러가 발생했습니다.', error });
    }
};
