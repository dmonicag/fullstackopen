import axios from "axios";
import { DiaryData, Diary } from '../src/types'

const BaseUrl = 'http://localhost:3000/api';

const createDiary = async (object: DiaryData) => {
    const { data } = await axios.post<Diary>(
        `${BaseUrl}/diaries`, object
    );
    return data;
}
export default { createDiary };
