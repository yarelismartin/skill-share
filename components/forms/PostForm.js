// import React, { useState } from 'react';
// import { Form } from 'react-bootstrap';

// export default function PostForm({ postObj }) {
//   const [formInput, setFormInput] = useState();

//   return (
//     <div>
//       <Form onSubmit={handleSubmit}>
//         <h2>{postObj.firebaseKey ? 'Update' : 'Create'} Post</h2>

//         {/* <Select Category/> */}
//         <Form.Label>Category</Form.Label>
//         <Form.Select
//           name="category"
//           value={formInput.category_id}
//           onChange={handleChange}
//           required="true"
//         >
//           <option value="" hidden>Choose a categpry</option>
//           {selectCategory.map((category) => (
//             <option
//               key={category.firebaseKey}
//               value={category.firebaseKey}
//             >{category.name}
//             </option>
//           ))}

//         </Form.Select>

//         {/* TITLE INPUT  */}
//         <Form.Group className="mb-3">
//           <Form.Label>Title</Form.Label>
//           <Form.Control
//             type="text"
//             placeholder="Post Title..."
//             name="title"
//             value={formInput.title}
//             onChange={handleChange}
//             required
//           />
//         </Form.Group>

//         <Form.Group className="mb-3">
//           <Form.Label>Position</Form.Label>
//           <Form.Control
//             type="text"
//             placeholder="Player's Position..."
//             name="position"
//             value={formInput.position}
//             onChange={handleChange}
//             required
//           />
//         </Form.Group>
//         <Form.Group className="mb-3">
//           <Form.Label>Image</Form.Label>
//           <Form.Control
//             type="text"
//             placeholder="Eneter a image address of player"
//             name="image"
//             value={formInput.image}
//             onChange={handleChange}
//             required
//           />
//         </Form.Group>
//         <Button style={{ marginTop: '15px' }} type="submit">{memObj.firebaseKey ? 'Update' : 'Create'} Memeber</Button>
//       </Form>
//     </div>
//   );
// }
