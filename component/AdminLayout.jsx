import  AdminSidebar  from "./AdminSidebar"

export default function AdminLayout({ children }){
    return (
        <>
            <div className="mr-3">
                <div className="row">
                    <div className="col-lg-2 col-md-3 col-sm-4 col-12">
                        <AdminSidebar />
                    </div>
                    <div className="col-lg-10 col-md-9 col-sm-8 col-12">
                        {children}
                    </div>
                </div>
            </div>
        </>
    )
}