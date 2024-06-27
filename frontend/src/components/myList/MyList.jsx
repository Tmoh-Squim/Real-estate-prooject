import './list.scss'
import Card from"../card/Card"
import { useSelector } from 'react-redux'
import { useEffect, useState } from 'react';

function MyList(){
    const {user} = useSelector((state)=>state.user);
  const {estates} = useSelector((state)=>state.estates);
  const [data,setData] = useState([]);

  useEffect(()=>{
    const data = estates?.filter((estate)=>estate.ownerId === user?.user?._id);
    setData(data);
  },[estates,user])
  return (
    <div className='list'>
      {data?.map(item=>(
        <Card key={item.id} item={item}/>
      ))}
    </div>
  )
}

export default MyList