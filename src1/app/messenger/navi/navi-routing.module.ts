import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

const routes: Routes = [
    {
        path: "",
        children: [
            // {
            //     path: "Dashboard",
            //     loadChildren: () =>
            //         import("src/app/messenger/navi/dashboard/dashboard.module").then(
            //             (module) => module.DashboardModule
            //         )
            // },
            {
                path: "",
                loadChildren: () =>
                import("src/app/messenger/navi/dashboard/dashboard.module").then(
                    (module) => module.DashboardModule
                    )
            },
            


        ]

    }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class NaviRoutingModule { }
