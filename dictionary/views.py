from django.shortcuts import render, redirect
from django.contrib.auth.decorators import login_required
from django.contrib.auth import login, logout, authenticate
from django.contrib.auth.forms import AuthenticationForm, UserCreationForm
from django.contrib import messages
from .models import DictionaryEntry

def home(request):
    return render(request, 'dictionary/home.html')

@login_required
def dictionary_view(request):
    translated_word = None
    query = None
    error_message = None

    if request.method == 'POST':
        query = request.POST.get('query').strip().lower()  # Get the English word to search for
        try:
            # Try to find the word in the DictionaryEntry model
            entry = DictionaryEntry.objects.get(english_word=query)
            translated_word = entry.shona_translation  # Fetch the Shona translation
        except DictionaryEntry.DoesNotExist:
            error_message = f"Sorry, no translation found for '{query}'."

    return render(request, 'dictionary/dictionary.html', {
        'query': query,
        'translated_word': translated_word,
        'error_message': error_message,
    })

def register_view(request):
    if request.method == 'POST':
        form = UserCreationForm(request.POST)
        if form.is_valid():
            user = form.save()
            login(request, user)
            return redirect('home')
    else:
        form = UserCreationForm()
    return render(request, 'registration/signup.html', {'form': form})

def login_view(request):
    if request.method == 'POST':
        form = AuthenticationForm(data=request.POST)
        if form.is_valid():
            user = form.get_user()
            login(request, user)
            return redirect('dictionary')
    else:
        form = AuthenticationForm()
    return render(request, 'dictionary/login.html', {'form': form})

def logout_view(request):
    logout(request)
    return redirect('login')
