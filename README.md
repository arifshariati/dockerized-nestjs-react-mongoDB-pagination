# dockerized-nestjs-react-mongoDB-pagination

dockerized nestjs react pagination with mongoDB is basic filter and pagination example implemented on backend (nestjs).

Going though backend code, you will get familized with easy to understand modularized backend implementation in any project in nestjs, which i personally like.

## Key Points
NestJs backend code is focused on genaralizing pagination for its usability for future modules to be constructed upon by creating seperate paginatModule.

### Backend
Paginate Module has two main tasks such as generateQuery and Paginate. generateQuery takes care of request params sent from frontend and Paginate handles formulate data to be sent back such as an object of page, perPage, total etc. below is sample code for PaginatModule service. 

```
userPaginate = async (req: Request) => {

        let options = this.generateUserQuery(req);

        const query = this.userService.find(options);

        const page: number = parseInt(req.query.page as any) || current_page;
        const limit: number = parseInt(req.query.perPage as any) || per_page;
        const total = await this.userService.count(options);

        const data = await query.skip((page) * limit).limit(limit).exec();

        return {
            data,
            total,
            page,
            last_page: Math.ceil(total / limit)
        };
    }

    private generateUserQuery = (req: Request) => {

        let options = {};
        let and = [];
        let or = [];
    
        if(req.query.search){
            or.push(
                {name: new RegExp(req.query.search.toString(), 'i')},
                {email: new RegExp(req.query.search.toString(), 'i')}
            );
        };
    
        if(req.query.gender){
            and.push({gender:req.query.gender});
        };
    
        if(or.length >0 && and.length > 0){
            options = {
                $or: or,
                $and: and
            };
        }else{
    
            if(or.length > 0){
                options = {
                    $or: or
                };
            }
            
            if(and.length > 0){
                options = {
                    $and: and
                };
            }
        }
        
        return options;
    };

```

### Frontend - React 

key things to focus on frontend side is how to dynamically joing query fields based on required data state values such as Search Gender etc. Have a look at below code;

```
let endPoint = 'http://localhost:4000/user/all';

const [users, setUsers] = useState([]);
const [search, setSearch] = useState("");
const [gender, setGender] = useState("");
const [page, setPage] = useState(0);
const [perPage, setPerPage] = useState(10);
const [total, setTotal] = useState(100);

// load users on page load
  useEffect(() => {
    
    (
      async () => {
        
        let arr = [];
        arr.push(`page=${page}`, `perPage=${perPage}`,`search=${search}`,`gender=${gender}`);

        try{
          
          Axios.get(`${endPoint}?${arr.join('&')}`)
          .then(result => {
            updateState(result.data);
          })
          .catch(err => {
            console.log('Axios Error', err);
          })
        }catch(e){
          console.log(e);
        }
        
      }
    )();
  },[search,page,perPage,gender]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangePerPage = (event) => {
    setPerPage(event.target.value);
    setPage(0);
  };

  const updateState = (response) => {
    setUsers(response.data);
    setPage(response.page);
    setTotal(response.total);
  }

  const handleSearch = (event) => {
    setSearch(event.target.value);
  }

  const handleFilterGender = (event) => {
    setGender(event.target.value);
  }

```

### Docker 
Project has been dockerized. I think there is nothing much more to go into Docker and Docker config details.

## Install & User  

after forking or cloning project, move to project folder and use below to make project running;

```
docker-compose up

```

Please note, in order to run project in docker, you mush have docker installed in your machine. 

Happy Coding !! 
