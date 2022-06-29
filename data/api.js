const url_api = 'http://192.168.1.117:4000/tasks'

export const getTasks = async () => {
    try {
        const response = await fetch(url_api);
        return await response.json();
    } catch (error) {
      console.log(error);
    }
    console.log('Se arma juego de datos local');
    response = {
        tasks: [
        {
            created_at: "",
            done: false,
            id: "0001",
            title: "homework4",
            updated_at: ""
        },
        {
            created_at: "",
            done: false,
            id: "0002",
            title: "homework5",
            updated_at: ""
        },
        {
            created_at: "",
            done: false,
            id: "0003",
            title: "homework6",
            updated_at: ""
        }
        ]
    };
    return response;
  }