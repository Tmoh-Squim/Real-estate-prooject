import './list.scss'
import Card from"../card/Card"
import { useSelector } from 'react-redux'
import { AiOutlineClose } from 'react-icons/ai';

function WishList(){
  const {cartItem} = useSelector((state)=>state.wishlist);
  return (
    <div className='list'>
      {cartItem?.map(item=>(
        <Card key={item.id} item={item} icon={<AiOutlineClose size={30} />}/>
      ))}
    </div>
  )
}

export default WishList