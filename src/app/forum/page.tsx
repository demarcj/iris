import styles from "@/_styles/forum.module.css"

const Forum = () => {
  const submit_data = async (data : FormData) => {
    "use server";
    console.log(data.get(`description`))
  };

  return (
    <form action={submit_data}>
      <label htmlFor="apartment_name">Apartment Name</label>
      <input id="apartment_name" name="apartment_name" />
      <label htmlFor="Price">Price</label>
      <input type="number" min={0} name="price" id="price"/>
      <label htmlFor="beds">Beds</label>
      <input type="number" min={0} name="beds" id="beds" />
      <label htmlFor="type">Property Type</label>
      <select name="type" id="type">
        <option value="buy">Condo</option>
        <option value="sell">House</option>
        <option value="rental">Land</option>
      </select>
      <label htmlFor="options">Property Option</label>
      <select name="options" id="options">
        <option value="buy">Buy</option>
        <option value="sell">Sell</option>
        <option value="rental">Rental</option>
      </select>
      <label htmlFor="description">Description</label>
      <textarea name="description" id="description" cols={30} rows={10}></textarea>
      <button className={styles.submit} type="submit">Submit</button>
    </form>
  )
}

export default Forum;