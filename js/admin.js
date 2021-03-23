
function showDropdown(id){
    const element_name = "dropdown-" + id + "-content";
    const element = document.getElementsByClassName (element_name)[0];
    element.classList.remove('hidden');
    document.querySelector('.open-'+id).classList.add('hidden');
    document.querySelector('.close-'+id).classList.remove('hidden');
}

function hideDropdown(id){
    const element_name = "dropdown-" + id + "-content";
    const element = document.getElementsByClassName (element_name)[0];
    element.classList.add('hidden');
    document.querySelector('.open-'+id).classList.remove('hidden');
    document.querySelector('.close-'+id).classList.add('hidden');
}