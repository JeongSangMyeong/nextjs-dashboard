import axios from 'axios';

export default async (req, res) => {
    const { query, start, apiType } = req.query;
    const apiUrl = `https://openapi.naver.com/v1/search/${apiType}.json`

    try {
        const { data } = await axios.get(apiUrl, {
            params: { query: query, start: start, display: 10 },
            headers: {
                'X-Naver-Client-Id': process.env.NAVER_CLIENT_ID,
                'X-Naver-Client-Secret': process.env.NAVER_CLIENT_SECRET
            }
        });
        console.log(data);
        res.status(200).json(data);
    } catch (error) {
        console.error('API 호출 에러:', error);
        res.status(500).json({ message: 'API 호출 중 에러가 발생했습니다.', error });
    }
};
