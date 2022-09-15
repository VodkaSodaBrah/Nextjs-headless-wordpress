export default function Home( {posts} ) {

  return (
    <div>
      <h1>HELLO from the homepage</h1>
      {
        posts.nodes.map(post => {
          return (
            <ul key={post.slug}>
              <li>{post.title}</li>
            </ul>
          )
        })
      }
    </div>
  )
}

export async function getStaticProps() {

  const res = await fetch('https://dipllc.tech/graphql', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({
      query: `
        query AllPostsQuery {
          posts {
            nodes{
              slug
              content
              title
            }
          }
        }
        `,
    })  
})

const json = await res.jason()

return {
  props: {
    posts: json.data.posts,
  },
}

}