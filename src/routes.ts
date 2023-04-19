import { ProfessorController } from "./controllers/professor-controller"

export const Routes = [{
    method: "get",
    route: "/professors",
    controller: ProfessorController,
    action: "all"
}, {
    method: "get",
    route: "/professors/:nusp",
    controller: ProfessorController,
    action: "one"
}, {
    method: "post",
    route: "/professors",
    controller: ProfessorController,
    action: "save"
}, {
    method: "delete",
    route: "/professors/:nusp",
    controller: ProfessorController,
    action: "remove"
}, {
    method: "post",
    route: "/professors/positions/:id",
    controller: ProfessorController,
    action: "approveOrRejectPosition"
}]