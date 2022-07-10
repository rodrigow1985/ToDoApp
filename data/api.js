const url_api = 'http://192.168.1.117:4000/tasks'

export const getTasks = async () => {
    try {
        const response = await fetch(url_api);
        return await response.json();
    } catch (error) {
      console.log(error);
    }
}

export const doneTask = async (taskId) => {
    try {
        const res = await fetch(`${url_api}/done/${taskId}`, {
            method: "PUT",
            headers: {
            Accept: "application/json",
                "Content-Type": "application/json",
            },
            //body: JSON.stringify(newTask),
        });
        return res;
    } catch (error) {
        console.log(error);
    }
};