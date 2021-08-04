(function() 
{
    "use strict"
    const $input = document.getElementById("input") 
    const $save = document.getElementById("save") 
    const $update = document.getElementById("update") 
    const $items = document.getElementById("items") 
    const $template = document.getElementById("template").content
    const fragmento = document.createDocumentFragment()
    const p = document.createElement("p");
    p.textContent = "No hay items nuevos 🐲";
    p.classList.add("text-center");

    let arr = [], jason = {};
    let clonar
    let pos_id = 0
    let cambio = false

    read_array(arr); 

    $save.addEventListener("click", saveItems);
    $update.addEventListener("click", updateItems);

    window.addEventListener("click", (e)=> 
    {
        if (e.target.classList.contains("delete")) 
        {
            const id_item = e.target.parentNode.parentNode.id;
            arr.splice( id_item , 1 );
            e.target.parentNode.parentNode.classList.add("dissapear");
            setTimeout(() => {  read_array(arr);  }, 500);
        }
        else if(e.target.classList.contains("update"))
        {
            const id_item = e.target.parentNode.parentNode.id;
            pos_id = id_item;
            $input.value = arr[id_item].item;

            $update.classList.remove("d-none");
            $save.classList.add("d-none");
            cambio = true;
            $input.focus();           
        }
    });


    window.addEventListener("keyup", (e)=> 
    {
        if (e.key == "Enter") 
        {
            if (!cambio)  saveItems();    
            else  updateItems(); 
        } 
    });

    // FUNCIONES
    function saveItems() 
    {
        if ($input.value.trim() === "")  alert("Ingresa un dato");    
        else
        {
            jason = { item: $input.value }
            arr.push(jason) 
            console.log(arr);
            read_array(arr);
        }
    }

    function updateItems() 
    {
        arr[pos_id].item = $input.value
        $update.classList.add("d-none")   
        $save.classList.remove("d-none")   
        read_array(arr);     
    }

    function read_array(arr) 
    {
        $input.value = "";
        $input.focus();
        cambio = false;
        const longitud = arr.length;

        while ( $items.firstChild  )  $items.removeChild($items.firstChild);

        if (longitud == 0)  $items.appendChild(p); 
        else
        {       
            arr.forEach((item,i) => 
            {
                clonar = $template.cloneNode(true)
                clonar.querySelector(".texto").textContent = item.item
                clonar.querySelector(".d-flex").id = i
                fragmento.appendChild(clonar)
            });

            $items.appendChild(fragmento);
        } 
    } 

})();