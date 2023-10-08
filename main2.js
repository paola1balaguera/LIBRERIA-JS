const input_1 = document.getElementById('title')
const input_2 = document.getElementById('author')
const input_3 = document.getElementById('publish-year')
const input_4 = document.getElementById('photo')
const card_container = document.getElementById('container_card')
let cont=0
let idUpdate=0
let bandera=true
let main_list = [
    /* {
        id:1,
        title : 'harry potter',
        author: 'pepe',
        publish_year: '2004',
        status: true,
        prestado_a: 'Diego :)' ,
        photo: 'https://www.eluniverso.com/resizer/R-IgToKQQY51jF8opYpnwcPtEcE=/1787x1005/smart/filters:quality(70)/cloudfront-us-east-1.images.arcpublishing.com/eluniverso/BDEDXKSYJNEHTBIR6VZFBKRT3E.jpg'
    } */
];
 


//creacion 
const create_book = () => {
    cont++ 
    main_list.push({
        id: cont,
        title: input_1.value,
        author: input_2.value,
        publish_year: input_3.value,
        status: false,
        prestado_a: '',
        photo: input_4.value 
    })
    alert("LIBRO REGISTRADO EXITOSAMENTE")
    clean_inputs()
    localStorage.setItem('main_list', JSON.stringify(main_list)) //YA LO GUARDO EN EL LOCAL STORAGE
    get_html(main_list)
}

const update_card = () => {
    main_list = [...main_list.filter(e => e.id !== idUpdate)]
    main_list.push({
        id: idUpdate,
        title: input_1.value,
        author: input_2.value,
        publish_year: input_3.value,
        status: false,
        prestado_a: '',
        photo: input_4.value 
    })
    alert("LIBRO EDITADO EXITOSAMENTE")
    clean_inputs()
    localStorage.setItem('main_list', JSON.stringify(main_list)) //YA LO GUARDO EN EL LOCAL STORAGE
    get_html(main_list)
}

const button_registrar = document.getElementById('button-registrar')
button_registrar.addEventListener('click', () => {
    if (bandera == true) {
        create_book()
    } else {
        update_card()
    }
} )



const clean_inputs = () => {
    input_1.value = ''
    input_2.value = ''
    input_3.value = ''
    input_4.value = ''
}


const edit_card = (id) => {
    idUpdate = id
    bandera=false
    item = main_list.filter(e => e.id == id)[0]
    input_1.value = item.title
    input_2.value = item.author
    input_3.value = item.publish_year
    input_4.value = item.photo
} 

const delete_card = (id) => {
    main_list = [...main_list.filter(e => e.id !== id)]
    localStorage.setItem('main_list',  JSON.stringify(main_list))
    get_html(main_list)
} 




const get_html = (main_list) => {
    let html = ""
    main_list.forEach(element => {
        html += `
        <div class="card" id="card-${element.id}">
            <div>
              <img src="${element.photo}" >
            </div>
            <div class="card-details">
              <div class="title">
                  <span><strong>TITULO</strong></span><br>
                  <span>${element.title}</span>
              </div>
              <div class="author">
                  <span><strong>AUTOR</strong></span><br>
                  <span>${element.author}</span>
              </div>
              <div class="publish-year">
                  <span><strong>AÑO DE PUBLICACIÓN</strong></span><br>
                  <span>${element.publish_year}</span>
              </div>
              <div class="global-buttons-card">
                  <button onclick='edit_card(${element.id})'>EDITAR</button>
                  <button onclick='delete_card(${element.id})'>ELIMINAR</button>
                  <button class="btn-return">DEVOLVER</button>
              </div>
            </div>
        </div>
        `
    });
    card_container.innerHTML = html //todo lo que este dentro de card container sea reemplazado por los valores de html

}









window.addEventListener('load', () => {
    if(localStorage.getItem('main_list') == null){
        main_list = []
    } else { 
        main_list = JSON.parse(localStorage.getItem('main_list'))
    }

    console.log(main_list);
    get_html(main_list)
})

/* localStorage: [
    "main_list": [
        {
            
        }
    ]
] */



 





