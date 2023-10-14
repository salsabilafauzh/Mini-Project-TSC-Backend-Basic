import http from 'http';
import data from './data.js';
const requestListener = (request, response) => {
  //splitting url & method from request
  const url = request.url.split('/')[1];
  const params = request.url.split('/')[2];
  const method = request['method'];

  //tipe response menjadi JSON
  response.setHeader('Content-Type', 'application/json');

  /**
   *  Endpoint GET / 'url' / 'params'
   */
  if (method === 'GET') {
    switch (url) {
      case 'users':
        const responseJson = {
          message: 'Berhasil mendapatkan data',
          data: data,
        };
        response.end(JSON.stringify(responseJson));
        break;
      case 'user':
        //implememtasi async
        displayData(() => {
          const dataFind = data.filter((item) => item.nama === params);

          //jika data tidak ditemukan
          if (dataFind.length === 0) {
            response.statusCode = 404;
            return response.end(JSON.stringify({ message: 'Data tidak ditemukan' }));
          }
          return response.end(JSON.stringify(dataFind));
        });
        break;
    }
  }

  /**
   *  Endpoint POST / 'url'
   */
  if (method === 'POST') {
    let requestBody = '';
    request.on('data', (data) => {
      requestBody += data;
    });

    switch (url) {
      case 'user':
        request.on('end', () => {
          // Parse the accumulated data as a JSON object
          requestBody = JSON.parse(requestBody);
          data.push(requestBody);
          return response.end(JSON.stringify(data));
        });
        break;
    }
  }

  /**
   *  Endpoint PUT / 'url' / 'params'
   */
  if (method === 'PUT') {
    let requestBody = '';
    request.on('data', (data) => {
      requestBody += data;
    });
    switch (url) {
      case 'user':
        request.on('end', () => {
          requestBody = JSON.parse(requestBody);
          const dataFind = data.filter((item) => item.nama === params);
          //jika data tidak ditemukan
          if (dataFind.length <= 0) {
            response.statusCode = 404;
            return response.end(JSON.stringify({ message: 'Data tidak ditemukan' }));
          } else {
            dataFind[0].nama = requestBody.nama;
            const responseJson = {
              message: 'Data berhasil diubah',
              data: dataFind,
            };
            return response.end(JSON.stringify(responseJson));
          }
        });
        break;
    }
  }

  /**
   *  Endpoint DELETE / 'url' / 'params'
   */
  if (method === 'DELETE') {
    switch (url) {
      case 'user':
        const index = data.findIndex((item) => item.nama == params);
        data.splice(index, 1);
        //jika data tidak ditemukan
        if (index == -1) {
          response.statusCode = 404;
          return response.end(JSON.stringify({ message: 'Data tidak ditemukan' }));
        }
        const responseJson = {
          message: 'Data berhasil dihapus',
          data: data,
        };
        return response.end(JSON.stringify(responseJson));
        break;
    }
  }

  /**
   * tambahan untuk implementasi async
   */
  function displayData(callback) {
    console.log('Simulating an async operation...');
    setTimeout(() => {
      callback();
    }, 3000);
  }
};
const app = http.createServer(requestListener);

const port = 5000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
