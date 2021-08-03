(function() 
{
const $input = document.getElementById("input") 
const $save = document.getElementById("save") 
const $update = document.getElementById("update") 
const $items = document.getElementById("items") 
const $template = document.getElementById("template").content

const p = document.createElement("p");
p.textContent = "No hay items nuevos 🐲";
p.classList.add("text-center");

const fragmento = document.createDocumentFragment()
 
let arr = [], jason = {};
let clonar
let save_id = 0

let boton = false

revisar_arr(arr); 

    window.addEventListener("keyup", (e)=> 
    { 
        if (e.key === "Enter") 
        {
            if ($input.value.trim() === "")  alert("ingresa un dato") 
            else
            {
                if (boton) 
                {
                    arr[save_id].item = $input.value;
                    $update.classList.add("d-none");
                    $save.classList.remove("d-none"); 
                }
                else
                {
                        jason = { item: $input.value };
                        arr.push(jason);
                }
                revisar_arr(arr); 
            }

        }
    });


    $save.addEventListener("click", ()=> 
    {
        if ($input.value.trim() === "")  alert("ingresa un dato")    
        else
        {
            jason = { item: $input.value };
            arr.push(jason);
            revisar_arr(arr); 
        }
    });
 

    $update.addEventListener("click", ()=> 
    {
        if ($input.value.trim() === "")  alert("ingresa un dato")
        else 
        {
            arr[save_id].item = $input.value;
            $update.classList.add("d-none");
            $save.classList.remove("d-none");
            revisar_arr(arr);    
        }
    });

 
    // FUNCIONES
    function revisar_arr(arr) 
    {
        $input.value = ""
        $input.focus()
        const longitud = arr.length

        while ( $items.firstChild  )  $items.removeChild($items.firstChild);

        if (longitud == 0) 
        {
            $items.appendChild(p);
        } 
        else
        {       
            boton = false
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


    window.addEventListener("click", (e)=> 
    {
        if (e.target.classList.contains("update")) 
        { 
            save_id = e.target.parentNode.parentNode.id;
            $input.value = arr[e.target.parentNode.parentNode.id].item;
            $save.classList.add("d-none");
            $update.classList.remove("d-none");
            boton = true   
            $input.focus() 
        }
        else if(e.target.classList.contains("delete"))
        {
            arr.splice(e.target.parentNode.parentNode.id, 1);
            e.target.parentNode.parentNode.classList.add("dissapear");
            setTimeout(() => 
            {
                revisar_arr(arr); 
            }, 500);        
        }
    });

})();