import React from 'react'

const Loadable = ({
   loader,
   loading: Loading
}) => {
   return class loadableComponent extends React.Component {
      state = {
         LoadabledComponent: null
      }

      componentDidMount() {
         loader()
            .then(res => {
               this.setState({
                  LoadabledComponent: res.default
               })
            })
      }

      render() {
         const { LoadabledComponent } = this.state
         return (
            LoadabledComponent
               ?
               <LoadabledComponent />
               :
               < Loading />
         )
      }
   }
}

export default Loadable
