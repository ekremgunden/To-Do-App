import TodoForm from '../components/todo-form'

function Index({ user }) {
    if (user) {
        return (
            <div className="w-4/5 md:w-1/2 max-w-3xl mx-auto">
                <h3 className="font-bold text-3xl sm:text-4xl text-center py-6 space-y-6">
                    Welcome, <span className="bg-yellow-200 px-2 py-1 rounded-sm inline-block md:inline">{user.username} !</span>
                </h3>
                <TodoForm />
            </div>
        )
    } else {
        return null
    }
}

export default Index