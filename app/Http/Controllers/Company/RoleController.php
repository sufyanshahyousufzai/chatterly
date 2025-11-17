<?php
namespace App\Http\Controllers\Company;
use App\Http\Controllers\Controller;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;
use Illuminate\Http\Request;
use Inertia\Inertia;

class RoleController extends Controller
{
    public function index()
    {
        $roles = Role::where('guard_name', 'staff')->with('permissions')->get();
        $permissions = Permission::where('guard_name', 'staff')->get();
        return Inertia::render('company/Roles', ['roles' => $roles, 'permissions' => $permissions]);
    }

    public function store(Request $request)
    {
        $role = Role::create(['name' => $request->name, 'guard_name' => 'staff']);
        if ($request->permissions) {
            $role->syncPermissions($request->permissions);
        }
        return back()->with('success', 'Role created successfully!');
    }
}
