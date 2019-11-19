const state = {
    name:localStorage.setItem("cicode",333),
    age:sessionStorage.setItem("age",22),
    count:1
}

 // getters
 const getters = {
    
}

// actions
const actions = {
 
}

const motations = {
    getActive(state, string){
        state.isActive = string
    },
    increment (state) {
        state.count++
    }
}

export default{
    state,
    getters,
    actions,
    motations
}