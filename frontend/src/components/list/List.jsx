import './list.scss'
import Card from"../card/Card"
import { useSelector } from 'react-redux'

function List(){
  const {estates} = useSelector((state)=>state.estates);
  return (
    <div className='list'>
      {estates?.map(item=>(
        <Card key={item.id} item={item}/>
      ))}
    </div>
  )
}

export default List