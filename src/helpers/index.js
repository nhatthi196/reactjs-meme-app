export function parseJwt(token) {
    try {
        var base64Url = token.split('.')[1];
        var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        var jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));

        return JSON.parse(jsonPayload);
    } catch(e) {
        return null;
    }
};

export function validate(key, value) {
    if (key === 'email') {
        if (!value.length) {
            return 'Email không được rỗng';
        }
    } else if (key === 'password') {
        if (!value.length) {
            return 'Password không được rỗng';
        } else if (value.length < 6) {
            return 'Password phải ít nhất 6 ký tự';
        }
    } 
    return '';
}



export function checkExistError(data) {
    let isError = false;
    Object.keys(data) //['username', 'password']
        .forEach(key => {
            const obj = data[key];
            const errorText = obj.error;
            if (errorText) {
                isError = true;
            }
        });
    return isError;
}

export function helperRecursiveMenus(item) {
    const data = {
      id: item.ID,
      url: item.url,
      title: item.title,
    }
  
    if (item.child_items) {
      data.child_items = item.child_items.map(helperRecursiveMenus)
    }
  
    return data;
  }

// const menusItem = response.data.items
//   .map(function(item){
    
//     const data = {
//       id: item.ID,
//       url: item.url,
//       title: item.title,
//     }

//     if (item.child_items) {
//       data.child_items = item.child_items
//         .map(function(child_item){

//           const childData = {
//             id: child_item.ID,
//             url: child_item.url,
//             title: child_item.title
//           }

//           if (child_item.child_items) {
//             childData.child_items = child_item.child_items 
//               .map(function(child_child_item) {

//                 const childChildData = {
//                   id: child_child_item.ID,
//                   url: child_child_item.url,
//                   title: child_child_item.title
//                 }

//                 if (child_child_item.child_items) {
//                   childChildData.child_items = child_child_item.child_items;
//                 }

//                 return childChildData;
//               })
//           }

//           return childData;

//         })
//     }
    
//     return data;

//   })