from django.shortcuts import render, redirect
from django.contrib.auth.decorators import login_required
from django.contrib.auth import login, logout, authenticate
from django.contrib.auth.forms import AuthenticationForm, UserCreationForm

def home(request):
    return render(request, 'dictionary/home.html')

@login_required
def dictionary_view(request):
    # Simulating dictionary lookup logic
    if request.method == 'POST':
        query = request.POST.get('query')
        # Lookup in your dictionary logic here (use JavaScript dictionary if needed)
        # e.g., translated_word = some_dictionary_lookup_function(query)
        translated_word = "Shona translation"  # Replace with actual logic
        return render(request, 'dictionary/dictionary.html', {'query': query, 'translated_word': translated_word})
    
    return render(request, 'dictionary/dictionary.html', {'form': form})

def register_view(request):
    if request.method == 'POST':
        form = UserCreationForm(request.POST)
        if form.is_valid():
            user = form.save()
            login(request, user)
            return redirect('dictionary')
    else:
        form = UserCreationForm()
    return render(request, 'dictionary/register.html', {'form': form})

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
