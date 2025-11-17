<?php

namespace App\Http\Controllers\Company;

use App\Http\Controllers\Controller;
use App\Models\KbCategory;
use App\Models\KbArticle;
use Illuminate\Http\Request;
use Inertia\Inertia;

class KnowledgeBaseController extends Controller
{
    public function index()
    {
        $company = auth()->guard('company')->user()->company;

        $categories = KbCategory::with(['articles' => function ($query) {
            $query->orderBy('created_at', 'desc')->limit(5);
        }])->where('company_id', $company->id)
          ->orderBy('sort_order', 'asc')
          ->get();

        $recentArticles = KbArticle::with('category')
            ->where('company_id', $company->id)
            ->where('is_published', true)
            ->latest()
            ->limit(10)
            ->get();

        return Inertia::render('company/KnowledgeBase', [
            'categories' => $categories,
            'recentArticles' => $recentArticles,
        ]);
    }

    public function show($id)
    {
        $company = auth()->guard('company')->user()->company;

        $article = KbArticle::with(['category', 'author'])
            ->where('company_id', $company->id)
            ->findOrFail($id);

        // Increment view count
        $article->increment('views');

        $relatedArticles = KbArticle::where('company_id', $company->id)
            ->where('category_id', $article->category_id)
            ->where('id', '!=', $article->id)
            ->where('is_published', true)
            ->limit(5)
            ->get();

        return Inertia::render('company/KnowledgeBaseArticle', [
            'article' => $article,
            'relatedArticles' => $relatedArticles,
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'category_id' => 'required|exists:kb_categories,id',
            'title' => 'required|string|max:255',
            'content' => 'required|string',
            'excerpt' => 'nullable|string|max:500',
            'is_public' => 'boolean',
            'is_published' => 'boolean',
        ]);

        $company = auth()->guard('company')->user()->company;
        $user = auth()->guard('company')->user();

        $article = KbArticle::create([
            'company_id' => $company->id,
            'category_id' => $request->category_id,
            'title' => $request->title,
            'slug' => \Str::slug($request->title),
            'content' => $request->content,
            'excerpt' => $request->excerpt,
            'is_public' => $request->is_public ?? true,
            'is_published' => $request->is_published ?? false,
            'author_id' => $user->id,
            'published_at' => $request->is_published ? now() : null,
        ]);

        return redirect()->route('company.kb.show', $article->id)
            ->with('success', 'Article created successfully!');
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'category_id' => 'required|exists:kb_categories,id',
            'title' => 'required|string|max:255',
            'content' => 'required|string',
            'excerpt' => 'nullable|string|max:500',
            'is_public' => 'boolean',
            'is_published' => 'boolean',
        ]);

        $company = auth()->guard('company')->user()->company;

        $article = KbArticle::where('company_id', $company->id)->findOrFail($id);
        
        $article->update([
            'category_id' => $request->category_id,
            'title' => $request->title,
            'slug' => \Str::slug($request->title),
            'content' => $request->content,
            'excerpt' => $request->excerpt,
            'is_public' => $request->is_public,
            'is_published' => $request->is_published,
            'published_at' => $request->is_published && !$article->published_at ? now() : $article->published_at,
        ]);

        return back()->with('success', 'Article updated successfully!');
    }

    public function destroy($id)
    {
        $company = auth()->guard('company')->user()->company;

        $article = KbArticle::where('company_id', $company->id)->findOrFail($id);
        $article->delete();

        return redirect()->route('company.kb.index')
            ->with('success', 'Article deleted successfully!');
    }

    // Category management
    public function storeCategory(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'icon' => 'nullable|string|max:50',
            'is_public' => 'boolean',
        ]);

        $company = auth()->guard('company')->user()->company;

        $lastCategory = KbCategory::where('company_id', $company->id)->orderBy('sort_order', 'desc')->first();
        $sortOrder = $lastCategory ? $lastCategory->sort_order + 1 : 0;

        KbCategory::create([
            'company_id' => $company->id,
            'name' => $request->name,
            'slug' => \Str::slug($request->name),
            'description' => $request->description,
            'icon' => $request->icon,
            'is_public' => $request->is_public ?? true,
            'sort_order' => $sortOrder,
        ]);

        return back()->with('success', 'Category created successfully!');
    }
}
