import axios from 'axios';

export const fetchWallPaper = async (): Promise<Object> => {
    try {
        const response = await axios.get(
            'https://picsum.photos/v2/list?page=1&limit=16'
        );
        return response.data;
    } catch (error) {
        if (error instanceof Error) {
            console.warn('Error getting wallpaper data:', error.message);
        }
        return {};
    }
};

export const fetchRadioStation = async (): Promise<Object> => {
    try {
        const response = await axios.get('https://somafm.com/channels.json');
        return response.data;
    } catch (error) {
        if (error instanceof Error) {
            console.warn('Error getting radio channels data:', error.message);
        }
        return {};
    }
};
