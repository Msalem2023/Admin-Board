import axios from "axios";

const apiUrl = 'https://api-dashboard-ccrr.vercel.app/'; // Set base URL from environment variable

export async function Update({ image, token }) {
    const formData = new FormData();
    formData.append("image", image);
    console.log(token);
    const config = {
        headers: {
            'content-type': 'multipart/form-data',
            'authorization': `Bearer ${token}`
        }
    };

    try {
        const res = await axios.put(`${apiUrl}/user/update`, formData, config);
        console.log(res);
        return res.data; 
    } catch (error) {
        console.error('Error updating user:', error);
        throw error;
    }
}

export async function Voice(formData) {
    console.log(formData.get('file'));
    const token = sessionStorage.getItem("token");
    const config = {
        headers: {
            'content-type': 'multipart/form-data',
            'authorization': `Bearer ${token}`
        }
    };

    try {
        const res = await axios.post(`${apiUrl}/Chat/voice-notes`, formData, config);
        console.log(res);
        return res.data;
    } catch (error) {
        console.error('Error updating user:', error);
        throw error;
    }
}

export async function UpdateRole({ role, NewTitle, token }) {
    const config = {
        headers: {
            'content-type': 'application/json',
            'authorization': `Bearer ${token}`
        }
    };

    try {
        const res = await axios.put(`${apiUrl}/user/updaterole`, { role, NewTitle }, config);
        console.log(NewTitle);
        console.log(res);
        return res.data;
    } catch (error) {
        console.error('Error updating user:', error);
        throw error;
    }
}

export async function CreateMeeting({ startDate, office, project, selectedTime, participants }) {
    console.log(startDate, office, project, selectedTime, participants);
    const config = {
        headers: {
            'content-type': 'application/json',
            'authorization': `Bearer ${sessionStorage.getItem("token")}`
        }
    };

    try {
        const res = await axios.post(`${apiUrl}/post`, { startDate, office, project, selectedTime, participants }, config);
        console.log(res);
        return res.data;
    } catch (error) {
        console.error('Error updating user:', error);
        throw error;
    }
}

export async function Group({ participants }) {
    console.log(participants);
    const config = {
        headers: {
            'content-type': 'application/json',
            'authorization': `Bearer ${sessionStorage.getItem("token")}`
        }
    };

    try {
        const res = await axios.post(`${apiUrl}/Chat/Group`, { participants }, config);
        console.log(res);
        return res.data;
    } catch (error) {
        console.error('Error updating user:', error);
        throw error;
    }
}

export const uploadImages = async ({ image, state, token }) => {
    console.log(image); 

    const formData = new FormData();
    for (let i = 0; i < image.length; i++) {
        formData.append(`image[]`, image[i]);
    }
    if (state?.Receiver) {
        console.log(state.Receiver);
        formData.append('ChatId', state.Receiver);
    } else {
        console.error('ChatId is undefined');
        return; 
    }

    try {
        const response = await axios.post(`${apiUrl}/Chat/attachments`, formData, {
            headers: {
                'Authorization': `Bearer ${sessionStorage.getItem("token")}`, 
                'Content-Type': 'multipart/form-data', 
            },
        });

        console.log('Success:', response.data);
    } catch (error) {
        console.error('Error:', error.response ? error.response.data : error.message);
    }
};

export async function fetchTeamData() {
    const response = await axios.post(
        `${apiUrl}/user/team`,
        {},
        {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${sessionStorage.getItem("token")}`,
            }
        }
    );
    return response.data;
};

export async function MyGroupChats() {
    const response = await axios.post(
        `${apiUrl}/Chat/my-chats`,
        {},
        {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${sessionStorage.getItem("token")}`,
            }
        }
    );
    return response.data;
};

export async function fetchMeetingData() {
    const response = await axios.post(
        `${apiUrl}/post/Meetings`,
        {},
        {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${sessionStorage.getItem("token")}`,
            }
        }
    );
    console.log(response);
    return response.data;
};

export async function chat({ queryKey }) {
    const id = queryKey[1];
    console.log(id);
    const response = await axios.post(
        `${apiUrl}/Chat`,
        { id },
        {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${sessionStorage.getItem("token")}`,
            }
        }
    );
    console.log(response.data);
    return response.data;
};

export async function notification() {
    const response = await axios.post(
        `${apiUrl}/user/notification`,
        {},
        {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${sessionStorage.getItem("token")}`,
            }
        }
    );
    console.log(response.data);
    return response.data;
};

export async function handelChat({ ChatId, Message }) {
    const config = {
        headers: {
            'content-type': 'application/json',
            'authorization': `Bearer ${sessionStorage.getItem("token")}`
        }
    };
    const res = await axios.post(`${apiUrl}/Chat/Message`, { ChatId, Message }, config);
    console.log(res);
}

export async function handelReaction({ messageId, emoji }) {
    console.log(emoji);
    const config = {
        headers: {
            'content-type': 'application/json',
            'authorization': `Bearer ${sessionStorage.getItem("token")}`
        }
    };
    const res = await axios.post(`${apiUrl}/Chat/reactions`, { messageId, emoji }, config);
    console.log(res);
}

