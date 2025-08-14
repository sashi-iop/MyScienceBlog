
async function loadPosts(){
  const res = await fetch('/posts/posts.json').catch(()=>fetch('posts/posts.json'));
  return res.json();
}
function sanitize(s){return (s||'').toLowerCase()}
function searchPosts(posts, q){
  if(!q) return posts;
  q = sanitize(q);
  return posts.filter(p =>
    sanitize(p.title).includes(q) ||
    sanitize(p.excerpt).includes(q) ||
    (p.tags||[]).some(t=>sanitize(t).includes(q))
  );
}
function renderList(posts){
  const list = document.getElementById('post-grid');
  if (!list) return;
  list.innerHTML='';
  posts.forEach(p=>{
    const el = document.createElement('article');
    el.className='card';
    el.innerHTML = [
      '<a href="'+p.url+'"><h3>'+p.title+'</h3></a>',
      '<div class="post-meta">'+new Date(p.date).toLocaleDateString()+' • '+(p.tags||[]).map(t=>'<span class="tag">'+t+'</span>').join(' ')+'</div>',
      '<p>'+p.excerpt+'</p>',
      '<a class="btn" href="'+p.url+'">Read →</a>'
    ].join('');
    list.appendChild(el);
  });
}
document.addEventListener('DOMContentLoaded', async () => {
  const posts = (await loadPosts()).sort((a,b)=> new Date(b.date)-new Date(a.date));
  renderList(posts);
  const input = document.getElementById('search');
  if (input){
    input.addEventListener('input', e=> renderList(searchPosts(posts, e.target.value)));
  }
});
